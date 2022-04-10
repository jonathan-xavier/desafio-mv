package jhon.desafiomv.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jhon.desafiomv.model.Item;
import jhon.desafiomv.repository.ItemRepository;

@CrossOrigin()
@RestController
@RequestMapping({"/item"})
public class ItemController {

	@Autowired
	private ItemRepository repository;
	
	
	//findAll
	
	@GetMapping
	public List<Item> findAll(){
		return repository.encontrarTodos();
	}
	
	
	//findById
	
	@GetMapping(value = "{id}")
	public ResponseEntity<Item> findById(@PathVariable long id){
		return repository.encontrarPorId(id)
				.map(record -> ResponseEntity.ok().body(record))
				.orElse(ResponseEntity.notFound().build());
	}
	
	//create
	
	
	@PostMapping
	public ResponseEntity<?> create(@RequestBody Item item) {
		 repository.salvar(item.getNome());
		 return ResponseEntity.ok().body("Salvo com sucesso!");
	}
	
	//update
	//editar item aqui, ou em colaborador?
	@PutMapping(value = "{id}")
	public ResponseEntity<Item> update(@PathVariable long id,
			@RequestBody Item item ){
		return repository.encontrarPorId(id)
				.map(record ->{
					record.setNome(item.getNome());
					Item update = repository.save(record);
					return ResponseEntity.ok().body(update);
				}).orElse(ResponseEntity.notFound().build());
		
		
	}
	
	//delete
	@DeleteMapping(value = "{id}")
	public ResponseEntity<?> delete(@PathVariable long id){
		
		return repository.encontrarPorId(id)
				.map(record ->{
					repository.deletar(id);
					return ResponseEntity.ok().body("Item "+ record.getNome() +
							" Deletado com sucesso");
				}).orElse(ResponseEntity.notFound().build());
	}
	
	
	
	
	
	
	
	
	
	
	
	
}
